import { PartialType } from "@nestjs/mapped-types";
import { CreateCCDto } from "./create-cc-dto";

export class UpdateCCDto extends PartialType(CreateCCDto){}