import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Item, Label,Header,Icon} from "semantic-ui-react"
import { rgbaToHsva } from 'tsparticles';



const Publication_list = ({data}) =>{

    const pub_list = data.map(d => { 
        return (
            <div key={d[0]} >
            <Label as='a' color='red' ribbon>{d[0]}</Label>
            <Item.Group divided>
                {d[1].map(pub => {
                    return (
                    <Item key={pub.Counter}>
                        <Item.Content>
                            <Item.Header>{pub.Title}</Item.Header>
                            {/* <Item.Meta>
                                <span className='subject'>
                                    <Header as='h5'>{toString(pub.Subject).replaceAll('#',', ')}</Header>
                                </span>
                            </Item.Meta> */}
                            <Item.Meta>
                                {pub.Authors.replaceAll('#',', ')}. <u>{pub.Title+', '}</u>  
                                {(pub.Publication) === 'NULL'? '': pub.Publication+', '} 
                                {(pub.Pages) === 'NULL'? '': pub.Pages+', '}
                                {(pub.Address) === 'NULL'? '': pub.Address+', '} 
                                {(pub.Publisher) === 'NULL'? '': 'Published by '+ pub.Publisher+', '}
                                {pub.Year};
                            </Item.Meta>
                            
                            
                            <Item.Description>
                                {/* <Label><Icon name='quote left' />Citations {pub.Citation}</Label> */}
                                {pub.GoogleScholarURL != 'NULL' &&
                                    <Label>
                                        <a href={pub.GoogleScholarURL} target="_blank" >
                                            <Icon name='google' />Google scholar
                                        </a>
                                    </Label>
                                }
                                <Label>
                                    <a href={pub.File} target="_blank">
                                        <Icon name='file pdf' />Download 
                                    </a>
                                </Label>
                            </Item.Description>
                            <br />
                        </Item.Content>
                    </Item>
                    )
                })}
                
            </Item.Group>
            </div>
        )
    })

    return(
       <>
       {pub_list}
       </>
    )
}

export default Publication_list