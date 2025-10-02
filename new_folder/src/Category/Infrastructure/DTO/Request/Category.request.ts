export class CreateCategoryRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
