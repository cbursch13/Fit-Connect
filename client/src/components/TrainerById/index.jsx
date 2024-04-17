import { useQuery } from '@apollo/client';
import { QUERY_ALL_INSTRUCTORS } from '../../utils/queries';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import trainer01 from '../../../public/images/trainer01.png';
import trainer02 from '../../../public/images/trainer02.jpeg';
import trainer03 from '../../../public/images/trainer03.jpeg';
import trainer04 from '../../../public/images/trainer04.jpeg';
import trainer05 from '../../../public/images/trainer05.jpeg';
import trainer06 from '../../../public/images/trainer06.jpeg';

const trainerImages = {
  '661f2640b9b8e63d1948c853': trainer01,
  '661f2640b9b8e63d1948c854': trainer02,
  '661f2640b9b8e63d1948c855': trainer03,
  '661f2640b9b8e63d1948c856': trainer04,
  '661f2640b9b8e63d1948c857': trainer05,
  '661f2640b9b8e63d1948c858': trainer06
};

export default function TrainerInfo({ trainerId }) {
  const { loading, error, data } = useQuery(QUERY_ALL_INSTRUCTORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const instructor = data.instructors.find(instructor => instructor._id === trainerId);

  if (!instructor) return <p>Error: Trainer not found</p>;

  const imageUrl = trainerImages[trainerId];

  return (
    <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
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
