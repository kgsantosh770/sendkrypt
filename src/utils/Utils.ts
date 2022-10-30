const addressShortener = (address: string) : string => {
    const shortAddress = address.substring(0,5) + '...' + address.substring(address.length - 4, address.length);
    return shortAddress;
}

export { addressShortener }