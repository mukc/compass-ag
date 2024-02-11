// Utility function to compare two dates when sorting table column
export const dateComparator = (date1, date2) => {
    const date1Number = new Date(date1)?.getTime() ?? null;
    const date2Number = new Date(date2)?.getTime() ?? null;

    return date1Number === date2Number ? 0 : date1Number === null ? -1 : date2Number === null ? 1 : date1Number - date2Number;
}