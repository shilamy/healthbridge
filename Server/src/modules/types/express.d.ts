
import { JwtPayload } from '../../modules/types/type'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export { JwtPayload };

