import React, { useState,useEffect, memo, useMemo  } from 'react';
import * as d3 from 'd3';
import { Segment, Grid, Header, Loader, Label, Tab, SearchResults } from 'semantic-ui-react';

import Publication_list from '../../publication/publication_list'
import SubjectGraph from '../graphs/subject';
import YearGraph from '../graphs/yeargraph';
import CoAuthorsGraph from '../graphs/coauthors';

const ByYear = ({data}) =>{ 

    const publications = (arr) =>{
        return Array.from (new Map([...d3.group(arr, d => d.Year).entries()].sort()))
    }

    const [Year_Data, SetYear_Data] = useState(data)
    const [CoAuthors_Data, SetCoAuthors_Data] = useState(data)
    const [Subject_Data, SetSubject_Data] = useState(data)
    const [Publication_Data, SetPublication_Data] = useState(publications(data))
    const [reset, SetReset] = useState(true)

    const Year_callBackFunc = (currentSelection) =>{

        if(currentSelection.length > 0){
            let result = []
            currentSelection.forEach(e => {
                const date_filter = data.filter(d=> d.Year == e)
                result = result.concat(date_filter)
            });
            SetCoAuthors_Data(result)
            SetSubject_Data(result)
            SetPublication_Data(publications(result))
        }else{
            SetCoAuthors_Data(data)
            SetSubject_Data(data)
            SetPublication_Data(publications(data))
        }
        
    }

    const Viz_YearGraph = useMemo(() => (<YearGraph data={Year_Data} Year_callBack={Year_callBackFunc} />),[Year_Data,reset])



    return(
        <Segment>
                <Grid>
                    <Grid.Column width={10}>
                        {Viz_YearGraph}
                        <SubjectGraph data={Subject_Data} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <CoAuthorsGraph data={CoAuthors_Data} />
                    </Grid.Column>
                    <Grid.Row stretched>
                    <Grid.Column width={16}>
                        <Segment>
                            <Publication_list data={Publication_Data.reverse()}></Publication_list>
                        </Segment>
                    </Grid.Column>
                </Grid.Row> 
                    
                </Grid>
            </Segment>
    )
}

export default ByYear