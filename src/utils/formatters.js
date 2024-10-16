export const formatters = {
  formatUrl: (url) => {
    // Check if the URL already starts with http:// or https://
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  },
};
