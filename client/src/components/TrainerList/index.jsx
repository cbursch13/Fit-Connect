import * as React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { QUERY_ALL_INSTRUCTORS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { UPDATE_INSTRUCTORS } from '../../utils/actions';

export default function CenteredTitlebarImageList() {
  const { loading, error, data } = useQuery(QUERY_ALL_INSTRUCTORS);
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_INSTRUCTORS,
        instructors: data.instructors,
      });
    } 
  }, [data, loading, dispatch]);

  console.log(state);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ paddingTop: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TitlebarImageList instructors={state.instructors}/>
      </div>
    </div>
  );
}

function TitlebarImageList({instructors}) {
  console.log(instructors);
  return (
    <ImageList sx={{ width: '100%', maxWidth: 1000, maxHeight: 600 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader sx={{ fontSize: '24px', color: '#339CFF', background: '#d3d3d3' }} component="div">MEET YOUR TRAINERS:</ListSubheader>
      </ImageListItem>
      {instructors.map((instructor) => (
        <ImageListItem key={instructor._id}>
          <Link to={`/trainers/${instructor._id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                srcSet={`images/${instructor.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`images/${instructor.image}?w=248&fit=crop&auto=format`}
                alt={instructor.firstName}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <ImageListItemBar
              title={instructor.firstName}
              subtitle={instructor.lastName}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${instructor.lastName}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  );
}