import React, { useState,useEffect, memo, useMemo  } from 'react';
import * as d3 from 'd3';
import { Segment, Grid, Header, Loader, Label, Tab, SearchResults } from 'semantic-ui-react';

import Publication_list from '../../publication/publication_list'
import SubjectGraph from '../graphs/subject';
import YearGraph from '../graphs/yeargraph';
import CoAuthorsGraph from '../graphs/coauthors';

const BySubject = ({data}) =>{ 

    const publications = (arr) =>{
        return Array.from (new Map([...d3.group(arr, d => d.Year).entries()].sort()))
    }

    const [Year_Data, SetYear_Data] = useState(data)
    const [CoAuthors_Data, SetCoAuthors_Data] = useState(data)
    const [Subject_Data, SetSubject_Data] = useState(data)
    const [Publication_Data, SetPublication_Data] = useState(publications(data))
    const [reset, SetReset] = useState(true)

    const Subject_callBackFunc = (currentSelection) =>{
        if(currentSelection.length > 0){
            let data_all_subjects = data
            let all_combinations = []
            data_all_subjects.forEach(e => {
                const subjects = e.Subject[0].split(',')
                subjects.forEach(d => {
                    e.M_subject = d
                    all_combinations.push(e)
                });
            });
            const groupBySubject = new Map([...d3.group(all_combinations, d=> d.M_subject).entries()].sort())
            let result = []
            currentSelection.forEach(e => {
                result = result.concat(groupBySubject.get(e))
            });
            const uniqueObjects = [...new Map(result.map(item => [item.id, item])).values()]
            SetCoAuthors_Data(uniqueObjects)
            SetYear_Data(uniqueObjects)
            SetPublication_Data(publications(uniqueObjects))
        }else{
            SetCoAuthors_Data(data)
            SetYear_Data(data)
            SetPublication_Data(publications(data))
        }
        
    }

    const Viz_SubjectGraph = useMemo(() => (<SubjectGraph data={Subject_Data} Subject_callBack={Subject_callBackFunc} />),[Subject_Data,reset])



    return(
        <Segment>
                <Grid>
                    <Grid.Column width={10}>
                        {Viz_SubjectGraph}
                        <YearGraph data={Year_Data} />
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

export default BySubject