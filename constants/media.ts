const mobileS = 320;
const mobileM = 375;
const mobileL = 425;
const tablet = 768;
const laptop = 1024;
const laptopL = 1440;
const desktop = 2560;

const device = {
	mobileS: `(max-width: ${mobileS}px)`,
	mobileM: `(max-width: ${mobileM}px)`,
	mobileL: `(max-width: ${mobileL}px)`,
	tablet: `(max-width: ${tablet}px)`,
	laptop: `(max-width: ${laptop}px)`,
	laptopL: `(max-width: ${laptopL}px)`,
	desktop: `(max-width: ${desktop}px)`,
	desktopL: `(max-width: ${desktop}px)`,
};
export { device, mobileS, mobileM, mobileL, tablet, laptop, laptopL, desktop };
