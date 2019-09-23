import React, { useEffect, useState } from 'react';

const useOptions = (list: Array<{ id: string; key: string }>) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      list.map((item) => ({
        value: item.id,
        label: item.key,
      })),
    );
  }, [list]);

  return { options };
};
