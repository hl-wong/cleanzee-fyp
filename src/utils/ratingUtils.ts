export const getAverageRating = (reviews?: { userRating: number }[]) => {
  if (!reviews || reviews.length === 0) {
    return "N/A";
  }

  const total = reviews.reduce((sum, review) => sum + review.userRating, 0);
  const average = total / reviews.length;

  return average.toFixed(1);
};

export const getStarIcon = (rating: string) => {
  if (rating === "N/A") {
    return "star-o";
  }

  const rounded = parseFloat(rating);
  return rounded % 1 === 0.5 ? "star-half-full" : "star";
};
