import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
// import compression from 'compression';

import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import stadiumRoute from './routes/stadium.route';
import stadiumAreaRoute from './routes/stadium_area.route';
import orderRoute from './routes/order.route';
import promotionRoute from './routes/promotion.route';
import teamRoute from './routes/team.route';
import invitationRoute from './routes/invitation.route';
import matchRoute from './routes/match.route';
import profileRoute from './routes/profile.route';
import { ErrorHandler } from './controllers/error.controller';

const app: Express = express();

app.enable('trust proxy');
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(helmet());
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 1000,
//     message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
// app.use(compression());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/stadium', stadiumRoute);
app.use('/api/area', stadiumAreaRoute);
app.use('/api/order', orderRoute);
// app.use('/api/promotion', promotionRoute);
app.use('/api/team', teamRoute);
app.use('/api/invitation', invitationRoute);
app.use('/api/match', matchRoute);
app.use('/api/profile', profileRoute);
app.get('*', (req: Request, res: Response) => {
    res.send('Invalid Enpoint');
});

app.use(ErrorHandler);

export default app;
