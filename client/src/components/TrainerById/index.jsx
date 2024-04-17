import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import trainer01 from '../../../public/images/trainer01.png';

export default function TrainerInfo() {
  return (
    <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={trainer01}
          alt="Trainer Image"
          style={{ width: '100%', height: 'auto' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Josh Daniels
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Joseph Daniels is a renowned trainer specializing in powerlifting and muscle building. Joseph's clients range from beginners looking to pack on muscle to seasoned powerlifters aiming to break personal records. If you're ready to take your strength and muscle gains to the next level, Joseph Daniels is the trainer for you.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
