export const getFirstLetter = (str: string): string => {
    const lastname = str.split(' ').at(-1);
    return lastname ? lastname[0] : 'NaN';
};

export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
