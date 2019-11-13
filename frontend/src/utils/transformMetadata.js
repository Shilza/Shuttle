
export const transformMetadata = items =>
  items.map(item => {
    if (item.hasOwnProperty('__meta__')) {
      Object.keys(item.__meta__).forEach(key =>
        item[key] = item.__meta__[key]
      );
      delete item.__meta__;
    }

    return item;
  });
