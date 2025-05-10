<script>
	export let color = '#ccc';
</script>

<div class="checkmark" style="--checkmark-color: {color}">
  <div class="checkmark_stem"></div>
  <div class="checkmark_kick"></div>
</div>

<style>
    .checkmark {
        display: inline-flex;
        width: 22px;
        height: 22px;
        transform: rotate(45deg);
        margin-right: -10px;
        margin-top: -2px;
    }

    .checkmark_stem {
        position: absolute;
        width: 3px;
        height: 9px;
        background-color: var(--checkmark-color);
        left: 11px;
        top: 12px;
    }

    .checkmark_kick {
        position: absolute;
        width: 3px;
        height: 3px;
        background-color: var(--checkmark-color);
        left: 8px;
        top: 18px;
    }
</style>