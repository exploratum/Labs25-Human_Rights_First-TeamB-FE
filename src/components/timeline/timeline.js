import React from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';
import axios from 'axios';
import { useState, useEffect } from 'react';

function latest(array, n) {
  return array.slice(0, n);
}

export default function PbTimeline() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`https://api.846policebrutality.com/api/incidents`)
        .then(res => {
          setResults(latest(res.data.data, 10));
        })
        .catch(err => {
          console.log(err);
        });
    }

    getData();
  }, []);

  console.log(results);

  return (
    <>
      <div className="tl-header">
        <h2>Timeline of Recent Events</h2>
      </div>
      <Timeline lineColor={'#ddd'} className="pbTimeline">
        {results.map(item => (
          <TimelineItem
            key={item.id}
            dateText={<Moment format="MM-DD-YYYY">{item.date}</Moment>}
            style={{ color: '#bc541e' }}
          >
            <h3>
              <a href={item.links[0]}>{item.title}</a>
            </h3>
            <h4>
              {item.city}, {item.state}
            </h4>
            <div className="tag-container">
              {item.tags.map(element => (
                <span className="timeline-tags">{element}</span>
              ))}
            </div>
            <div className="timeline-links">
              {item.links.splice(0, 3).map(element => (
                <a href={element} className="link-button">
                  Source
                </a>
              ))}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
}
