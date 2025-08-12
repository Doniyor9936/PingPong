import { PartialType } from "@nestjs/swagger";
import { CreateClubDto } from "./createdto";

export class UpdateClubDto extends PartialType(CreateClubDto) {}
