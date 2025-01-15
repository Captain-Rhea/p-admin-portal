<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <div
        v-bind="activatorProps"
        class="flex items-center gap-2 text-slate-600 cursor-pointer p-2 rounded-md hover:bg-gray-50"
      >
        <v-icon>mdi-magnify</v-icon>
        <div>Search</div>
        <div class="border rounded px-2 py-[2px] text-xs text-slate-400">
          Cmd+K
        </div>
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
