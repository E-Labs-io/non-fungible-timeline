/** @format */

/**
 * @notice  -   Get a JSON from server (URL)
 */
const getStaticProps = async (url) => {
  const res = await fetch(url);
  const data = await res
    .json()
    .catch((error) =>
      console.log(
        "🚨 ERROR - getStaticProps from: ",
        url,
        " - with error: ",
        error
      )
    );
  return data;
};

export default getStaticProps;
