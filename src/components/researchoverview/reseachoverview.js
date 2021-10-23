import React, { useState,useEffect, memo, useMemo  } from 'react';
import * as d3 from 'd3';
import { Segment, Grid, Header, Loader, Label } from 'semantic-ui-react';
import YearGraph from './graphs/yeargraph';
import SubjectGraph from './graphs/subject';
import CoAuthorsGraph from './graphs/coauthors';
import Publication_list from '../publication/publication_list';



const ResearchOverview_cmp = ({data}) =>{ 

    // Data pre processed
    data.forEach(d => {
        d.Year = parseInt(d.Year)
        d.Subject =String(d.Subject).split("#").map(d=> d.trim())
        d.co_authors =  String(d.Authors).split("#").map(d=> d.trim())
    });

    const publications = (arr) =>{
        return Array.from (new Map([...d3.group(arr, d => d.Year).entries()].sort()))
    }

    // component states
    const [reset, SetReset] = useState(true)
    const [Year_Data, SetYear_Data] = useState(data)
    const [CoAuthors_Data, SetCoAuthors_Data] = useState(data)
    const [Subject_Data, SetSubject_Data] = useState(data)
    const [Publication_Data, SetPublication_Data] = useState(publications(data))

    function refreshAllExceptSubject(currentSelection){
        let pubs 
        if( currentSelection.length !== 0){
            pubs = data.filter(d => d.Subject.some(ai => currentSelection.includes(ai))) 
        }else{
            pubs = data
        }
        SetCoAuthors_Data(pubs)
        SetYear_Data(pubs)
        SetPublication_Data(publications(pubs))
    }

    function refreshAllExceptAuthor(currentSelection){
        let pubs
        if( currentSelection.length !== 0){
            pubs = data.filter(d => d.co_authors.some(ai => currentSelection.includes(ai))) 
        }else{
            pubs = data
        }
        SetSubject_Data(pubs)
        SetYear_Data(pubs)
        SetPublication_Data(publications(pubs))
    }

    function refreshAllExceptYear(currentSelection){
        let pubs 
        if( currentSelection.length !== 0){
            pubs= data.filter(d => currentSelection.indexOf(d.Year)> -1) 
        }else{
            pubs = data
        }
        SetSubject_Data(pubs)
        SetCoAuthors_Data(pubs)
        SetPublication_Data(publications(pubs))
    }

    useEffect(()=>{
        SetYear_Data(data)
        SetCoAuthors_Data(data)
        SetSubject_Data(data)
    },[reset])

    const CoAuthors_callBackFunc = (FilteredData) =>{
        refreshAllExceptAuthor(FilteredData)
    }

    const Year_callBackFunc = (FilteredData) =>{
        refreshAllExceptYear(FilteredData)
    }

    const Subject_callBackFunc = (FilteredData) =>{
        refreshAllExceptSubject(FilteredData)
    }

    const Viz_YearGraph = useMemo(() => (<YearGraph data={Year_Data} Year_callBack={Year_callBackFunc} />),[Year_Data,reset])
    const Viz_CoAuthorsGraph = useMemo(() => (<CoAuthorsGraph data={CoAuthors_Data} CoAuthors_callBack={CoAuthors_callBackFunc} />),[CoAuthors_Data,reset])
    const Viz_SubjectGraph = useMemo(() => (<SubjectGraph data={Subject_Data} Subject_callBack={Subject_callBackFunc} />),[Subject_Data,reset])

    const resetClicked = () => {
        SetReset(!reset)
      }
  


    return (
        <> 
        <Segment>
            <Label as='a' color='red' ribbon='right' onClick={resetClicked}> 
                Reset
            </Label>
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column width={8}>
                        <Segment>
                            {Viz_CoAuthorsGraph}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Segment>
                        <Header as='h4' >Subject areas</Header>
                            {Viz_SubjectGraph}
                        </Segment>
                        <Segment>
                            <Header as='h4' icon textAlign='center'>Research Contributions (Yearly)</Header>
                            {Viz_YearGraph}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column width={16}>
                        <Segment>
                            <Publication_list data={Publication_Data.reverse()}></Publication_list>
                        </Segment>
                    </Grid.Column>
                </Grid.Row> 
            </Grid>
        </Segment>
        
        </>
    )
}

export default ResearchOverview_cmp