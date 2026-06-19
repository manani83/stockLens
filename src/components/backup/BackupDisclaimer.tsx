export function BackupDisclaimer() {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      이 기능은 브라우저 localStorage에 저장된 데이터를 JSON 파일로 백업/복원하는
      MVP 기능입니다. 백업 파일은 사용자가 직접 관리해야 하며, 파일을
      분실하거나 브라우저 데이터를 삭제하면 복구가 어려울 수 있습니다.
    </section>
  );
}
