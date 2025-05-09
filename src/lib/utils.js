export function getSortQuery(sorter) {
    if (sorter?.order) {
        const sortField = {
            field: sorter?.field,
            order: sorter?.order
        }
        const sortOrder = sortField?.order === 'ascend' ? 1 : -1;
        return { [sortField?.field]: sortOrder };
    }
    return {};
}

export function getFilterQuery(filters) {
    const query = {};

    Object.keys(filters).forEach(key => {
        if (filters[key] !== null) {
            query[key] = Array.isArray(filters[key]) ? { $in: filters[key] } : filters[key];
        }
    });

    return query;
}