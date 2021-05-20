import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getGameRecords } from "../../redux/slices/singlePlaySlice";

const RecordPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameRecords());
  }, []);

  return (
    <div>Record</div>
  );
};

export default RecordPage;
