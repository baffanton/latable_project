module.exports = function (restaurantData, oneImageMode) {
  return {
    id: restaurantData.id,
    name: restaurantData.name,
    label: restaurantData.label_ids,
    phoneNumber: restaurantData.phone_number,
    address: restaurantData.address,
    averageCheck: restaurantData.average_check,
    link: {
      vk: restaurantData.vk_link,
      instagram: restaurantData.instagram_link,
      site: restaurantData.site_link,
    },
    image: !restaurantData.images.length
      ? restaurantData.images
      : [restaurantData.images[0]],
  };
};
