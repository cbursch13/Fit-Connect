import { useQuery } from '@apollo/client';
import { QUERY_ALL_INSTRUCTORS } from '../../utils/queries';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function TrainerInfo({ trainerId }) {
  const { loading, error, data } = useQuery(QUERY_ALL_INSTRUCTORS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const instructor = data.instructors.find(instructor => instructor._id === trainerId);

  if (!instructor) return <p>Error: Trainer not found</p>;

  console.log(instructor.image);

  return (
    <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={`./../images/${instructor.image}`}
          alt={`${instructor.firstName} ${instructor.lastName} Image`}
          style={{ width: '100%', height: 'auto' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${instructor.firstName} ${instructor.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {instructor.bio}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
