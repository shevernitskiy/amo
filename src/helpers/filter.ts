export class Filter<
  TSingle extends string[] | never,
  TMulti extends string[] | never,
  TRange extends string[] | never,
  TStatus extends number | never,
  TCustomField extends number | never,
> {
  private current: string[] = [];

  single(key: TSingle[keyof TSingle], value: string | number): this {
    this.current.push(`filter[${key}]=${value}`);
    return this;
  }

  multi(key: TMulti[keyof TMulti], values: (string | number)[]): this {
    for (let i = 0; i < values.length; i++) {
      this.current.push(`filter[${key}][${i}]=${values[i]}`);
    }
    return this;
  }

  range(key: TRange[keyof TRange], from: number, to: number): this {
    this.current.push(`filter[${key}][from]=${from}&filter[${key}][to]=${to}`);
    return this;
  }

  statuses(pipeline_and_status: [TStatus, TStatus][]): this {
    for (let i = 0; i < pipeline_and_status.length; i++) {
      this.current.push(
        `filter[statuses][${i}][pipeline_id]=${pipeline_and_status[i][0]}&filter[statuses][${i}][status_id]=${
          pipeline_and_status[i][1]
        }`,
      );
    }
    return this;
  }

  custom_field(field_id: TCustomField, value: string | number): this {
    this.current.push(`filter[custom_fields_values][${field_id}][]=${value}`);
    return this;
  }

  custom_field_range(field_id: TCustomField, from: string | number, to: string | number): this {
    this.current.push(
      `filter[custom_fields_values][${field_id}][from]=${from}&filter[custom_fields_values][${field_id}][to]=${to}`,
    );
    return this;
  }

  toString(): string {
    return this.current.join("&");
  }
}

export type FilterLike<
  TSingle extends string[] | never,
  TMulti extends string[] | never,
  TRange extends string[] | never,
  TStatus extends number | never,
  TCustomField extends number | never,
> =
  | Filter<TSingle, TMulti, TRange, TStatus, TCustomField>
  | ((
    filter: Filter<TSingle, TMulti, TRange, TStatus, TCustomField>,
  ) => Filter<TSingle, TMulti, TRange, TStatus, TCustomField>);

export function filterLikeToString<
  TSingle extends string[] | never,
  TMulti extends string[] | never,
  TRange extends string[] | never,
  TStatus extends number | never,
  TCustomField extends number | never,
>(filter_like: FilterLike<TSingle, TMulti, TRange, TStatus, TCustomField>): string {
  if (filter_like instanceof Filter<TSingle, TMulti, TRange, TStatus, TCustomField>) return filter_like.toString();
  return filter_like(new Filter()).toString();
}
