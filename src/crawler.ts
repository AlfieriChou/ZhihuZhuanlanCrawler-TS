import {SendNewZhihuRequest} from './client'

async function GetPinnedArticlePidAndAuthor(columnName: string) {
    if (columnName === "") {
        throw new Error('专栏名不能为空')
    }
    const url = `https://zhuanlan.zhihu.com/api/columns/${columnName}/pinned-article`;
    SendNewZhihuRequest(url)
        .then(res => {
            const ret = {
                'type': res.data.type,
                'id': res.data.id,
                'updated': res.data.updated,
                'created': res.data.created,
                'title': res.data.title,
                'image_url': res.data.image_url,
                'url': res.data.url,
                'excerpt': res.data.excerpt,
                'author': res.data.author,
            };
            console.log(ret);
            return ret
        })
        .catch(err => {
            throw err
        })
}

async function _getArticleListPidsByLimitAndOffset(columnName: string, limit: number, offset: number) {
    if (columnName === "") {
        throw new Error('专栏名不能为空')
    }

    const url = `https://zhuanlan.zhihu.com/api/columns/${columnName}/articles?limit=${limit}&offset=${offset}`;
    console.log(url);


    return SendNewZhihuRequest(url)
        .then(res => {
            const articleIds = new Set();
            res.data.data.forEach((ele: any) => {
                articleIds.add(ele.id);
            });
            console.log('articleIds', articleIds);
            return Promise.resolve(articleIds)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

async function GetArticlesListPids(columnName: string) {
    if (columnName === "") {
        throw new Error('专栏名不能为空')
    }

    const limit = 20;
    let offset = 0;

    const url = `https://zhuanlan.zhihu.com/api/columns/${columnName}/articles?limit=${limit}&offset=${offset}`;
    SendNewZhihuRequest(url)
        .then(res => {
            const articleIds = new Set();
            res.data.data.forEach((ele: any) => {
                articleIds.add(ele.id);
            });

            const tasks = [];

            for (offset = offset + limit; offset < res.data.paging.totals; offset += limit) {
                const task = _getArticleListPidsByLimitAndOffset(columnName, limit, offset);
                tasks.push(task)
            }

            Promise.all(tasks)
                .then(res => {
                    console.log('res', res)
                })
                .catch(err => {
                    throw err
                })

        })
        .catch(err => {
            throw err
        });
}

(async () => {
    // GetPinnedArticlePidAndAuthor('OTalk')
    await GetArticlesListPids('OTalk');
})();
