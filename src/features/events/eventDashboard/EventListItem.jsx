import React from 'react';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

export default function EventListItem() {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header content="CPSC474" />
                            <Item.Description>
                                Hosted by Ileana
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> Date
                    <Icon name='marker'/> Venue
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    <EventListAttendee />
                    <EventListAttendee />
                    <EventListAttendee />
                    <EventListAttendee />
                </List>
            </Segment>
            <Segment clearing>
                <div>CS474 study group</div>
                <Button color='teal' floated='right' content='More Info'/>
            </Segment>
        </Segment.Group>
    )
}