import React, { useEffect, useState } from 'react';
import { Message } from '@project14-8-6/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);



  return (
    <div>hello {m.message}</div>
  );
};

export default App;
