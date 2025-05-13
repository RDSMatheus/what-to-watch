import EventEmitter from 'node:events';
import { User } from '../../../prisma/app/generated/prisma/client';

export const userEvents = new EventEmitter();

export type UserCreatedPayload = User;
