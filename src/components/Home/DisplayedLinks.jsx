import propTypes from "prop-types";

import LinkList from "./LinkList";

const DisplayedLinks = ({ display, isSearchResults, isExistingLinks }) => {
  DisplayedLinks.propTypes = {
    display: propTypes.array.isRequired,
    isSearchResults: propTypes.bool,
    isExistingLinks: propTypes,
  };
  return (
    <>
      <LinkList
        display={display}
        isSearchResults={isSearchResults}
        isExistingLinks={isExistingLinks}
      />
      {!display.length && isExistingLinks && (
        <p className="flex justify-center text-[11px]  text-dimWhite">
          Nothing here😐
        </p>
      )}
    </>
  );
};

export default DisplayedLinks;
