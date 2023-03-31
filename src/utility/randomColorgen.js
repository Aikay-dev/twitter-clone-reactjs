const colors = [];

const isColorTooCloseToWhite = (r, g, b) => {
  const distance = Math.sqrt(
    (r - 255) * (r - 255) + (g - 255) * (g - 255) + (b - 255) * (b - 255)
  );
  return distance < 100;
};

const isColorTooCloseToBlackOrGray = (r, g, b) => {
  const distance = Math.sqrt(
    (r - g) * (r - g) + (g - b) * (g - b) + (b - r) * (b - r)
  );
  return distance < 70;
};

while (colors.length < 20) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  if (
    !isColorTooCloseToWhite(r, g, b) &&
    !isColorTooCloseToBlackOrGray(r, g, b)
  ) {
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
}

export default function randColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomElement = colors[randomIndex];
  return randomElement;
}
