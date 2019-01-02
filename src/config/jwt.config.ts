// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

export default {
  secret: process.env.JWT_SECRET || '072CC01ED3E62215D9764B91FECA3BF45ECAE70A44A81434D8F8206B0B07D01D',
  expires: process.env.JWT_EXPIRES || '30m'
};
