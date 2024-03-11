import { Either } from "src/generics/Either";
import { CleaningAction } from "../cleaningAction";

export interface ICleaningAction {
    createCleaningAction (action: CleaningAction): Promise<Either<Error, string>>;
}