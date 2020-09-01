import {http} from '../utils/http';


export function getProfile({offset = 0, limit, filter = {}, sort = {}}) {
    const request = {
        offset,
        limit: limit * (PAGINATION_SIZE - 1) + 1,
        sort: SortHelper.urlEncode(sort),
        name_like: filter.name || undefined,
        content_type_like: filter.contentType || undefined
    };

    return http.get(`${BACKEND.api}/storage/files`, request)
        .then(result => ({
            total: offset + result.data.length,
            files: result.data.slice(0, limit)
        }));
}
