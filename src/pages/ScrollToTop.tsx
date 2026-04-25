import { useEffect } from "react";
import { useLocation } from "react-router";

/**scrolls to top when navigating to new page */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}