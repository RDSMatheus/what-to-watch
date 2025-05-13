import AuthService from '../../modules/auth/services/auth.service';
import { UserCreatedPayload, userEvents } from './user.events';

const authService = new AuthService();

userEvents.on('userCreated', async (user: UserCreatedPayload) => {
  try {
    await authService.register(user);
    console.log(`Verification email sent to ${user.email}`);
  } catch (err) {
    console.error('Failed to send verification email:', err);
  }
});
