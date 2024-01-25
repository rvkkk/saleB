/*import React, { useState } from 'react';

const SearchComponent = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleInputFocus = () => {
    // הפעולה שתתבצע כאשר ה-input מקבל פוקוס
    setShowLinks(true);
  };

  const handleInputBlur = () => {
    // הפעולה שתתבצע כאשר ה-input מאבד פוקוס
    setShowLinks(false);
  };

  return (
    <div className="search--search--C_fO_MU" data-spm-anchor-id="a2g0o.detail.0.i18.9a6fYWWgYWWgkK">
      <input
        className="search--keyword--15P08Ji"
        type="text"
        placeholder="אני קונה עבור..."
        autoComplete="off"
        maxLength="50"
        id="search-words"
        value=""
        fdprocessedid="e8kbj"
        data-spm-anchor-id="a2g0o.detail.0.i17.9a6fYWWgYWWgkK"
        onFocus={handleInputFocus} // הוספת ה-event listener כאן
        onBlur={handleInputBlur} // הוספת ה-event listener כאן
      />
      {showLinks && (
        <div className="links-container">
          כאן אתה יכול להוסיף את רשימת הקישורים שלך 
          <a>קישור 1</a>
          <a>קישור 2</a>
        </div>
      )}
      <input className="search--submit--2VTbd-T" type="button" fdprocessedid="xokug7" />
    </div>
  );
};

export default SearchComponent;*/