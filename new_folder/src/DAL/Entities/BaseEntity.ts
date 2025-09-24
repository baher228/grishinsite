import { PrimaryKey, Property, OptionalProps } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export enum BaseEntityTableColumnNames {
  id = 'id',
  createdAt = 'created_at',
  updatedAt = 'updated_at',
}

export abstract class BaseEntity<TOpt extends string = never> {
  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | TOpt;

  @ApiProperty()
  @PrimaryKey({ autoincrement: true, fieldName: BaseEntityTableColumnNames.id })
  public id!: number;

  @ApiProperty()
  @Property<BaseEntity>({
    defaultRaw: 'now()',
    type: 'timestamptz',
    fieldName: BaseEntityTableColumnNames.createdAt,
  })
  public createdAt!: Date;

  @ApiProperty()
  @Property<BaseEntity>({
    onUpdate: (entity) => (entity.updatedAt = new Date()),
    defaultRaw: 'now()',
    type: 'timestamptz',
    fieldName: BaseEntityTableColumnNames.updatedAt,
  })
  public updatedAt!: Date;
}
