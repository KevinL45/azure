import {Format} from "./format";
import {Tag} from "./tag";

export interface Photo {
  id: number;
  name: string;
  picture: string;
  description: string;
  target_client: string;
  logo: boolean;
  pictures_human: boolean;
  format: Array<Format>;
  tags: Array<Tag>;
}

/**
class Format(models.Model):
id = models.AutoField(primary_key=True)
name = models.TextField(max_length= 50, null=False, blank=False)

class Tag(models.Model):
id = models.AutoField(primary_key=True)
name = models.TextField(max_length= 50, null=False, blank=False)

class Photo(models.Model):
id = models.AutoField(primary_key=True)
name = models.TextField(max_length= 50, null=False, blank=False)
picture = models.TextField(max_length= 255, null=False, blank=False)
description = models.TextField(max_length= 255, null=False, blank=False)
target_client = models.TextField(max_length= 255, null=False, blank=False)
logo = models.BooleanField(default=False)
pictures_human = models.BooleanField(default=False)
format_id = models.ForeignKey(Format, on_delete=models.CASCADE)
tags = models.ManyToManyField(Tag)
 */
