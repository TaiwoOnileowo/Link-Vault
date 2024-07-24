export const getAdjustedPosition = (x, y, menuRef) => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuRef.current;
  
    let adjustedX = x;
    let adjustedY = y;
  
    if (x + menuWidth > windowWidth) {
      adjustedX = windowWidth - menuWidth - 10;
    }
  
    if (y + menuHeight > windowHeight) {
      adjustedY = windowHeight - menuHeight - 10;
    }
  
    return { adjustedX, adjustedY };
  };
  