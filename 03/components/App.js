import React from 'react';
import Box from './Box';
import Div from './Div';
import { TextContext } from '../context';

const App = () => (
  <section>
    <Box />
    <TextContext.Provider value="sibling">
      <Div />
    </TextContext.Provider>
  </section>
);

export default App;
