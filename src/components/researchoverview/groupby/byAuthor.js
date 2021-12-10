import React, { useState,useEffect, memo, useMemo  } from 'react';
import * as d3 from 'd3';
import { Segment, Grid, Header, Loader, Label, Tab, SearchResults } from 'semantic-ui-react';

import Publication_list from '../../publication/publication_list'
import SubjectGraph from '../graphs/subject';
import YearGraph from '../graphs/yeargraph';
import CoAuthorsGraph from '../graphs/coauthors';

const ByAuthor = ({data}) =>{ 

    const publications = (arr) =>{
        return Array.from (new Map([...d3.group(arr, d => d.Year).entries()].sort()))
    }

    const [Year_Data, SetYear_Data] = useState(data)
    const [CoAuthors_Data, SetCoAuthors_Data] = useState(data)
    const [Subject_Data, SetSubject_Data] = useState(data)
    const [Publication_Data, SetPublication_Data] = useState(publications(data))
    const [reset, SetReset] = useState(true)

    const CoAuthor_callBackFunc = (currentSelection) =>{
        if(currentSelection.length > 0){
            let data_all_coAuthors = data
            let filtered_data = []
            data_all_coAuthors.forEach(e => {
                const coAuth = e.co_authors
                if (coAuth.some(r=> currentSelection.indexOf(r) >= 0)){
                    filtered_data.push(e)
                }
            });
            const uniqueObjects = [...new Map(filtered_data.map(item => [item.id, item])).values()]
            
            SetSubject_Data(uniqueObjects)
            SetYear_Data(uniqueObjects)
            SetPublication_Data(publications(uniqueObjects))
        }else{
            SetSubject_Data(data)
            SetYear_Data(data)
            SetPublication_Data(publications(data))
        }
        
    }

    const Viz_AuthorGraph = useMemo(() => (<CoAuthorsGraph data={CoAuthors_Data} CoAuthors_callBack={CoAuthor_callBackFunc} />),[CoAuthors_Data,reset])



    return(
        <Segment>
                <Grid>
                    <Grid.Column width={6}>
                        {Viz_AuthorGraph}
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <SubjectGraph data={Subject_Data} />
                        <YearGraph data={Year_Data} />
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

export default ByAuthor