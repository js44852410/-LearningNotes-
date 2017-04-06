Vue.filter('mobile', mobile => {
  if (!mobile) return;
  const value = String(mobile);
  const start = value.substr(0, 3);
  const end = value.substr(7, 4);
  return `${start}****${end}`;
});

Vue.filter('checked', (items, value = false, remark = '', number = 0) => {
  const remarks = self.JSON.parse(self.sessionStorage.getItem('remarks'));
  if (items && !items.checked) {
    Vue.set(items, 'checked', value);
  }

  if (items instanceof Array) {
    items.forEach(item => {
      if (item.checked) return;
      Vue.set(item, 'checked', value);
      if (remark && remarks) {
        Vue.set(item, 'remark', remarks[item.store_id]);
      }
      if (number) {
        Vue.set(item, 'number', number);
      }
    });
  }
  return items;
});

Vue.filter('checkedAttr', items => {
  items.forEach((item) => {
    Vue.set(item, 'checked', false);
  });
  return items;
});

Vue.filter('maxNum', number => {
  if (number > 99) {
    return '99+';
  } else {
    return number;
  }
});

Vue.filter('formatAmount', amount => {
  if (amount) {
    return '¥' + amount;
  } else {
    return '¥0.00';
  }
})
