exports.englishToBangla = (value) => {

  const banglaNumber = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return value.toString().replace(/[0-9]/g, function (w) {
    return banglaNumber[+w];
  });
};

exports.discountInPercentage = (mrp, cropPrice) => {
  return Math.ceil(((mrp-cropPrice)/mrp)*100);
}