module.exports = function (restaurantData) {
  return {
    id: restaurantData.id,
    name: restaurantData.name,
    label: restaurantData.label_ids,
    phoneNumber: restaurantData.phone_numbers,
    address: restaurantData.addresses,
    averageCheck: restaurantData.average_check,
    link: {
      vk: restaurantData.vk_link,
      instagram: restaurantData.instagram_link,
      site: restaurantData.site_link,
    },
    image: restaurantData.images,
  };
};
