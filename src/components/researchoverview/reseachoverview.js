import React, { useState,useEffect, memo, useMemo  } from 'react';
import * as d3 from 'd3';
import { Segment, Grid, Header, Loader, Label, Tab, SearchResults } from 'semantic-ui-react';
import YearGraph from './graphs/yeargraph';

import BySubject from './groupby/bySubject'
import ByYear from './groupby/byYear';
import ByAuthor from './groupby/byAuthor';


const ResearchOverview_cmp = ({data}) =>{ 


    const panes = [
        { menuItem: 'By Subject', render: () => <Tab.Pane><BySubject data={data}/></Tab.Pane> },
        { menuItem: 'By Author', render: () => <Tab.Pane><ByAuthor data={data}/></Tab.Pane> },
        { menuItem: 'By Year', render: () => <Tab.Pane><ByYear data={data}/></Tab.Pane> },
      ]
    
    return (
    
        <Segment>
            <Tab panes={panes} defaultActiveIndex={0} />
        </Segment>
        
    )
}

export default ResearchOverview_cmp