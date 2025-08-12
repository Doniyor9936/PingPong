import { PartialType } from "@nestjs/swagger";
import { CreateTableDto } from "./createTabelDto";

export class UpdateTableDto extends PartialType(CreateTableDto) {
   
}